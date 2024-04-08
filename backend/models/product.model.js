
import { db, pgp } from "./index.js";
import {createReadStream} from "fs";
import { Transform } from "stream";

async function processCSVFile(filePath, headers, user) {
    // Transform stream for parsing CSV data
    const parser = new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            const lines = chunk.toString().split('\n');
            lines.forEach(line => {
                const currentLine = line.split(',');
                const obj = {};
                headers.forEach((header, idx) => {
                    obj[header] = currentLine[idx];
                });
                obj.userid = user;
                obj.created_at = new Date();
                this.push(obj);
            });
            callback();
        }
    });

    // Create a readable stream from the file
    const readStream = createReadStream(filePath);

    // Pipe the file stream through the parser
    readStream.pipe(parser);

    // Return the parser stream for further processing
    return parser;
}

const header = ['product_name', 'price', 'sku', 'description',"userid","created_at"]
//batch Size
const batchSize = 10;

async function* getBatchedData(parser, batchSize) {
    let batch = [];
    
    for await (const data of parser) {
        batch.push(data);
        
        if (batch.length === batchSize) {
            yield batch;
            batch = [];
        }
    }
    
    if (batch.length > 0) {
        yield batch;
    }
}

const getAllProducts = async (user, pageNumber, pageSize) => {
    let products = {};
    var offset = (pageNumber - 1) * pageSize

    try {
        products.data = await db.any('WITH total_count AS (SELECT COUNT(*) AS count  FROM public.products WHERE userid = $1)  SELECT *, (SELECT count FROM total_count) AS total_count FROM public.products WHERE userid = $1  ORDER BY created_at DESC  LIMIT $2   OFFSET $3;', [user, parseInt(pageSize, 10), offset])
        products.total= products.data && products?.data?.length >0 ? parseInt(products?.data[0]?.total_count):0
    }
    catch (error) {
        console.error(error)
    }
    return products;
}

const addAllProducts = async (req, user) => {
    const filePath = req.file.path;

    const parser = await processCSVFile(filePath, header, user);
    const cs = new pgp.helpers.ColumnSet(header, { table: { table: 'products', schema: 'public' } });

    try {
        const result = await db.tx('massive-insert', async t => {
            // Loop through the data and insert it in batches
            for await (const batch of getBatchedData(parser, batchSize)) {
                const onConflict = ' ON CONFLICT(product_name,userid) DO NOTHING';
                const insert = pgp.helpers.insert(batch, cs) + onConflict;
                await t.none(insert);
            }
        });
        return result;
    } catch (error) {
        console.error(error);
    }
};

export { getAllProducts, addAllProducts }
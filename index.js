import { encode, decode, code } from "@ipld/dag-cbor";
import { CID } from "multiformats";
import { sha256 } from "multiformats/hashes/sha2";

import * as multiformats from "multiformats";

const data = [
  {
    name: "Example",
    version: "1.0",
    description: "This is a sample JSON document",
    list: [
      {
        a: 123,
        b: 123,
      },
      {
        x: 987,
        y: 876,
      },
    ],
  },
  {
    version: "1.0",
    name: "Example",
    list: [
      {
        b: 123,
        a: 123,
      },
      {
        y: 876,
        x: 987,
      },
    ],
    description: "This is a sample JSON document",
  },
  {
    version: "1.0",
    list: [
      {
        a: 123,
        b: 123,
      },
      {
        y: 876,
        x: 987,
      },
    ],
    description: "This is a sample JSON document",
    name: "Example",
  },
];
async function make_cid(document) {
  // Step 1: Encode the JSON object into DAG-CBOR format
  const encodedData = encode(document);

  console.log("--------");
  console.log(encodedData);
  console.log("--------");

  // Step 2: Create a multihash (using SHA-256) for the encoded data
  // const hash = await multiformats.multihash.hash(encodedData, "sha2-256");
  const hash = await sha256.digest(encodedData);

  // Step 3: Create a CID with the DAG-CBOR codec and the multihash
  const cid = CID.create(1, code, hash);

  // const cid = multiformats.CID.create(
  //   1,
  //   multiformats.codecs["dag-cbor"].code,
  //   hash
  // );

  // Output the generated CID
  console.log(JSON.stringify(document, undefined, 2));
  console.log(`Generated CID: ${cid.toString()}`);
}

await data.forEach(async (obj) => {
  await make_cid(obj);
});

// let decoded = decode(data)
// decoded.y[0] // 2
// CID.asCID(decoded.z.a) // cid instance

// // encode/decode options are exported for use with cborg's encodedLength and decodeFirst
// import { encodeOptions, decodeOptions } from '@ipld/dag-cbor'
// import { encodedLength } from 'cborg/length'
// import { decodeFirst } from 'cborg'

// // dag-cbor encoded length of obj in bytes
// const byteLength = encodedLength(obj, encodeOptions)
// byteLength // 104

// // concatenate two dag-cbor encoded obj
// const concatenatedData = new Uint8Array(data.length * 2)
// concatenatedData.set(data)
// concatenatedData.set(data, data.length)

// // returns dag-cbor decoded obj at the beginning of the buffer as well as the remaining bytes
// const [first, remainder] = decodeFirst(concatenatedData, decodeOptions)

// console.log(first, remainder)
// assert.deepStrictEqual(first, obj)
// assert.deepStrictEqual(remainder, data)

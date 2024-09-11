import libipld
import json
import cid
import multihash
import hashlib

with open("data.json", encoding="utf-8") as f:
    data = json.load(f)
    print(data)
    for d in data:
        print("\n" + "=" * 80)
        encoded = libipld.encode_dag_cbor(d)

        print("encoded :", list(encoded))
        decoded = libipld.decode_dag_cbor(encoded)
        print("decoded :", decoded)  # {'hello': [b'world', 1, 2, 3]}

        # Generate a SHA-256 hash of the CBOR-encoded document
        hash_bytes = hashlib.sha256(encoded).digest()

        # Encode the hash using multihash (specifying the SHA-256 algorithm, 0x12)
        multihash_value = multihash.encode(hash_bytes, "sha2-256")

        # Create CIDv1 with dag-cbor codec and multihash
        generated_cid = cid.CIDv1(codec="dag-cbor", multihash=multihash_value).encode("base32")

        print("cid:    :", generated_cid)  # {'hello': [b'world', 1, 2, 3]}

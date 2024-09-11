import cbrrr
import json

with open("data.json", encoding="utf-8") as f:
    data = json.load(f)
    print(data)
    for d in data:
        print("\n" + "=" * 80)
        encoded = cbrrr.encode_dag_cbor(d)
        print("encoded :", encoded)  # b'\xa1ehello\x84Eworld\x01\x02\x03'
        decoded = cbrrr.decode_dag_cbor(encoded)
        print("decoded :", decoded)  # {'hello': [b'world', 1, 2, 3]}
        cid = cbrrr.CID.cidv1_dag_cbor_sha256_32_from(encoded)
        print("cid:    :", cid)  # {'hello': [b'world', 1, 2, 3]}


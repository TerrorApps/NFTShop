set -B

for i in {25..7776}
do
  curl -s -k 'GET' 'localhost:3000/api/0n1/nano_suit?tokenId='$i
done

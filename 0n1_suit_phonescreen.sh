set -B

for i in {1..7776}
do
  curl -s -k 'GET' 'localhost:3000/api/0n1/phonescreen?tokenId='$i
done

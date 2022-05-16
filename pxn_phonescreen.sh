set -B

for i in {7..9999}
do
  curl -s -k 'GET' 'localhost:3000/api/pxn/phonescreen?tokenId='$i
done

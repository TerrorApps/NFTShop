set -B
for i in {0..7776}
  curl -s -k 'GET' 'localhost:3000/api/azuki?tokenId='$i
do

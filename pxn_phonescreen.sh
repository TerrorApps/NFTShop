set -B

for i in {3733..4444}
do
  curl -s -k 'GET' 'localhost:3000/api/akyllers/phonescreen?token='$i
done

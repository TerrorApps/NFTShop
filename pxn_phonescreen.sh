set -B

for i in {3782..4444}
do
  curl -s -k 'GET' 'localhost:3000/api/akyllers/twitter_banner?token='$i
done

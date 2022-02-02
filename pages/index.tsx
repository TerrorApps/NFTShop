import Head from 'next/head'
import { useWeb3 } from "@3rdweb/hooks"

export default function Home() {
  const { connectWallet, address, error } = useWeb3();
  var image = null;
  return (
    <div>
<form
  onSubmit={async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      tokenid: { value: string };
    };
    const tokenId = target.tokenid.value;
    console.log("yoooooo")
    var res = await fetch(`/api/hello?tokenId=${tokenId}`)
    console.log("response")
    console.log(res)
    image = true
  }}
>
  <div>
    <label>
      Token Id:
      <input type="tokenid" name="tokenid" />
    </label>
  </div>
  <div>
    <input type="submit" value="Submit" />
  </div>
</form>
  { image != null ? 'image found' : 'no image' }
  </div>
  );
}

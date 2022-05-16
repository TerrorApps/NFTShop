export default function PxnCard() {
    return (
        <a href="/pxn/phonescreen" className="rounded overflow-hidden shadow-lg">
        <img className="w-full" src="./home/pxn_home.png" alt="Forest" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Phantom Network: Ghost</div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-indigo-600 mr-2 mb-2">#phone screen</span>
        </div>
      </a>
    );
}
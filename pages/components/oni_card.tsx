export default function OniCard() {
    return (
        <a href="/0n1/phonescreen" className="rounded overflow-hidden shadow-lg">
        <img className="w-full" src="./home/oni_home.png" alt="0n1 Force" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">0N1 Force</div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-indigo-600 mr-2 mb-2">#phone screen</span>
        </div>
      </a>
    );
}
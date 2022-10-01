export default function AkyllerCard() {
    return (
        <a href="/akyllers/phonescreen" className="rounded overflow-hidden shadow-lg">
        <img className="w-full" src="./home/akyllers_home.png" alt="Forest" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Akyllers</div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-indigo-600 mr-2 mb-2">#phone screen</span>
        </div>
      </a>
    );
}
export default function KarafuruCard() {
    return (
        <a href="/karafuru" className="rounded overflow-hidden shadow-lg">
        <video className="w-full" autoPlay={true} loop muted>
            <source src="./home/karafuru_home.mp4" type="video/mp4" />
        </video>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Karafuru</div>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-indigo-600 mr-2 mb-2">#phone screen</span>
        </div>
      </a>
    );
}
export default function Card({ name, url, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-64 mx-auto sm:w-auto bg-cyan-500/30 h-80 lg:h-64 border border-cyan-500 p-3 bg-no-repeat bg-cover flex flex-col cursor-pointer transition ease-in-out duration-300 hover:shadow-lg shadow-cyan-400/50"
    >
      <div className="flex-auto group bg-white p-5 min-h-0 flex items-center justify-center">
        <img
          className="max-h-full max-w-full object-center object-contain transition ease-in-out duration-300 group-hover:scale-[1.1]"
          src={url}
          alt={name}
        />
      </div>
      <h1 className="text-neutral-100 text-center pt-2 text-xl tracking-widest">{name}</h1>
    </div>
  );
}

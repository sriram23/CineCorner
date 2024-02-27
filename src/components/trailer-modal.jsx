const TrailerModal = ({ data, onClose }) => {
  return (
    <div className="flex flex-col items-center w-2/3 h-2/3 bg-white overflow-auto rounded-md relative">
      <h1 className="text-3xl font-bold text-center">Trailer</h1>
      <button onClick={onClose} className="bg-black text-white pl-4 pr-4 pb-1 pt-1 rounded-full absolute top-0 right-0 m-2 mr-4">X</button>
      <div className="w-full flex flex-col items-center overflow-auto">
        {data &&
          data.results &&
          data.results.map(
            (video) =>
              video &&
              video.site === "YouTube" && (
                <iframe
                  className="aspect-video w-2/3 m-4"
                  title="Youtube player"
                  sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
                  src={`https://youtube.com/embed/${video.key}?autoplay=0`}
                ></iframe>
              )
          )}
      </div>
    </div>
  );
};
export default TrailerModal;

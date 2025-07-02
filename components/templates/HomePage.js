const todoContainersStyle = 'w-full bg-white rounded-lg'
const bannerStyle = 'text-white font-bold w-full text-center rounded-t-lg py-0.5 px-2'
function HomePage({todos}) {
  return (
    <div className="flex justify-between items-start gap-4">
      <div className={todoContainersStyle}>
        <p className={`${bannerStyle} bg-orange-400`}>Todo</p>
      </div>
      <div className={todoContainersStyle}>
        <p className={`${bannerStyle} bg-emerald-500`}>In Progress</p>
      </div>
      <div className={todoContainersStyle}>
        <p className={`${bannerStyle} bg-blue-600`}>Review</p>
      </div>
      <div className={todoContainersStyle}>
        <p className={`${bannerStyle} bg-cyan-500`}>Done</p>
      </div>
    </div>
  );
}

export default HomePage;
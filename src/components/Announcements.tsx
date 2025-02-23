const Announcements = () => {
    return <div className="bg-white p-4 rounded-md">
        <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Annonces</h1>
        <span className="text-xs text-gray-400">Voir tout</span>
        </div>
        <div className="flex flex-col gap-4 mt-4"></div>
        <div className="bg-lamaSkyLight rounded-md p-4">
        <div className="flex items-center justify-between">

        <h2 className="font-medium">Finish UI design for Kanberi</h2>
        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
            22/01/2025
        </span>
        </div>
        <p className="text-sm text-gray-400 mt-1">
            feel Pain and suffering for this project
        </p>
        </div>
        <div className="bg-lamaPurpleLight rounded-md p-4">
        <div className="flex items-center justify-between">
            <h2 className="font-medium">i need help</h2>
        </div>
        </div>
    </div>;
    
   
};
export default Announcements;

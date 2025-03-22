import Upload from "../Components/Upload"; // Import the Upload component

function Learning() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Learning Mode</h1>
      <Upload /> {/* Display the Upload component here */}
    </div>
  );
}

export default Learning;
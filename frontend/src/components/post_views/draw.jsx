import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";


 // after post naviagtes to main page but diesnt update to the latest post ahve to refresh and image is not showin




export default function Draw({ user, setUser, setPost,fetchPosts }){
const canvasRef = useRef(null);
const [posts, setPosts] = useState([]);
const [gridSize, setGridSize] = useState(20)
const [cellSize, setCellSize] = useState(20)
const [bgColor, setbgColor]= useState("#000000")
const [brush, setbrush] = useState("#39FF14")
const [checker1, setChecker1] = useState("#39FF14");
 const [checker2, setChecker2] = useState("#000000"); 
 const [tool, setTool] = useState("brush"); 
 const [recentColors, setRecentColors] = useState([]); 
 const [isDrawing, setIsDrawing] = useState(false); 
 const [useChecker, setUseChecker] = useState(false);
const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

const handleSubmit = (e) => {
  e.preventDefault();
  setError("");

  const canvas = canvasRef.current;

  canvas.toBlob(async (blob) => {
    const formData = new FormData();
    formData.append("post[title]", title);
    formData.append("post[body]", description);
    formData.append("post[post_pic]", blob, "pixelore.png");

    try {
      const response = await axios.post(
        "http://localhost:3000/posts.json",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Posted successfully:", response.data);
      await fetchPosts()

      setTitle("");
      setDescription("");
      navigate("/"); 
    } catch (err) {
      console.error(err);
      setError("Post failed :(");
    }
  }, "image/png");
};




 const drawbg = () =>{
  const canvas = canvasRef.current 
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0,0,canvas.width, canvas.height)

  if(useChecker){
    for (let i = 0; i < gridSize; i++){
      for (let j = 0; j < gridSize; j++){
        ctx.fillStyle = (i + j) % 2 === 0 ? checker1 : checker2;
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }
  }else {
    ctx.fillStyle = bgColor; ctx.fillRect(0, 0, gridSize * cellSize, gridSize * cellSize);
  }
  
  ctx.strokeStyle = "#39FF14"; 
  ctx.lineWidth = 0.5; for (let i = 0; i <= gridSize; i++) { ctx.beginPath(); 
  ctx.moveTo(0, i * cellSize);
   ctx.lineTo(gridSize * cellSize, i * cellSize); 
   ctx.stroke(); ctx.beginPath(); ctx.moveTo(i * cellSize, 0); 
   ctx.lineTo(i * cellSize, gridSize * cellSize); ctx.stroke(); }

 }

 useEffect(() =>{
  const canvas = canvasRef.current 
  canvas.width = gridSize*cellSize;
  canvas.height = gridSize * cellSize
  drawbg()
},[gridSize, cellSize,bgColor,checker1,checker2,useChecker])

const startDrawing = (e) => { 
  setIsDrawing(true); draw(e);
 }; 
 const stopDrawing = () => {
   setIsDrawing(false); 
  };
const updateRecentColors = (color) => { 
  setRecentColors((prev) => {
     const updated = [color, ...prev.filter((c) => c !== color)];
      return updated.slice(0, 5); }); 
    };
  
    const draw=(e) =>{
      if (!isDrawing && e.type !== "mousedown") 
        return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / cellSize); 
      const y = Math.floor((e.clientY - rect.top) / cellSize);

      if (x < 0 || y < 0 || x >= gridSize || y >= gridSize) return;

      if(tool ==="brush"){
        ctx.fillStyle = brush; 
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize); 
        updateRecentColors(brush);
      }else if(tool==="eraser"){
        if (useChecker) { ctx.fillStyle = (x + y) % 2 === 0 ? checker1 : checker2;
      }else {
        ctx.fillStyle = bgColor;
      }
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }else {
      const pixel = ctx.getImageData( x * cellSize + 1, y * cellSize + 1, 1, 1 ).data;
      const picked = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1)}`;
      setbrush(picked); updateRecentColors(picked); setTool("brush");
    }

  }

  const downloadPic = () =>{
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'pixelore.png'
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  const getCanvasDataURL = () => {
  const canvas = canvasRef.current;
  return canvas.toDataURL("image/png"); 
};


  const clearCanvas = () => { 
    drawbg(); 
  };

  return(
    <div className="main_container">
      <div className="draw_option">
        <div className="grid_size">
           <label>Grid Size:</label>
          <select name="size" id="size" value={gridSize} onChange={(e) => setGridSize(e.target.value)}>
            {[10, 16, 20, 24, 32, 40].map((n) => ( 
              <option key={n} value={n}> {n} x {n} </option> 
              ))}
          </select>
        </div>
        <div className="cell_size">
          <label>Cell Size:</label>
           <select value={cellSize} onChange={(e) => setCellSize(Number(e.target.value))}>
             {[10, 15, 20, 25, 30].map((n) => ( 
              <option key={n} value={n}> {n}px </option> 
              ))}
            </select>
        </div>
        <div className="checker">
              <input type="checkbox" checked={useChecker} onChange={(e) => setUseChecker(e.target.checked)} />
               <span>Use Checker Background</span>
        </div>
        {useChecker ? (
           <> 
           <div className="control-group"> 
            <label>Checker Color 1:</label> 
            <div className="color-input"> 
              <input type="color" value={checker1} onChange={(e) => setChecker1(e.target.value)} className="cyber-color" /> 
              <span>{checker1}
              </span>
               </div> 
               </div>
                <div className="control-group"> 
                  <label>Checker Color 2:</label> 
                  <div className="color-input"> 
                    <input type="color" value={checker2} onChange={(e) => setChecker2(e.target.value)} className="cyber-color" /> 
                    <span>{checker2}
                    </span>
                     </div> 
                     </div> 
                     </> ) :( 
                      <div className="control-group"> 
                      <label>Background Color:</label> 
                      <div className="color-input">
                         <input type="color" value={bgColor} onChange={(e) => setbgColor(e.target.value)} className="cyber-color" /> 
                         <span>{bgColor}</span> 
                         </div> 
                         </div> )}
              <div className="brush">
                  <label>Brush Color:</label>
                  <input type="color" value={brush} onChange={(e) => { setbrush(e.target.value);
                   updateRecentColors(e.target.value); }} className="cyber-color" /> 
                   <span>{brush}</span>
              </div>
              <div className="btn-actives">
                 <input type="color" value={brush} onChange={(e) => { setbrush(e.target.value); 
                  updateRecentColors(e.target.value);
                   }} className="cyber-color" /> 
                   <span>{brush}</span>
                    </div> 
                      <div className="control-group">
                       <label>Tool:</label> 
                      <div className="tool-buttons">
                         <button onClick={() => setTool("brush")} className={tool === "brush" ? "cyber-button active" : "cyber-button"} > Brush </button>
                          <button onClick={() => setTool("eraser")} className={tool === "eraser" ? "cyber-button active" : "cyber-button"} > Eraser </button>
                           <button onClick={() => setTool("picker")} className={tool === "picker" ? "cyber-button active" : "cyber-button"} > Picker </button> 
                      </div>
                      <div className="recent_colors">
                        <label>Recent Colors:</label>
                        <div className="recent-colors"> {recentColors.map((c, i) => ( <div key={i} onClick={() => setbrush(c)} className="color-swatch" style={{ backgroundColor: c }} title={c} >
                        </div> 
                      ))} 
                        </div>
                      </div>
      </div>
                    </div>
      <div className="canvas">
        <div className="grid">
          <canvas ref={canvasRef} 
          className="pixel-canvas" 
          onMouseDown={startDrawing} 
          onMouseUp={stopDrawing} 
          onMouseLeave={stopDrawing} 
          onMouseMove={draw} ></canvas>
        </div>
        <div className="post">
              <div className="post-form-container">
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {user ? (
          <button type="submit">
            Post as {user.username}
          </button>
        ) : (
          <>
            <button type="submit">
              Post as Guest
            </button>
            <p>Sign up if you would like to post as a user</p>
          </>
        )}

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
    
                      <div className="btn_options">
                      <button onClick={clearCanvas} className="cyber-button"> Clear Canvas </button>
                      <button onClick={downloadPic} className="cyber-button"> Download </button>
                      </div>
        </div>
      </div>
    </div>
  )
}
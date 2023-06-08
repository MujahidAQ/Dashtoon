import logo from './logo.svg';
import './App.css';
import useNetwork from './hooks/useNetwork';
import { useEffect, useRef, useState } from 'react';

function App() {

  const { loading, data } = useNetwork('https://loremflickr.com/320/240')
  const [listItem, setlistItem] = useState([])

  const dragItem = useRef(null)
  const dragOverItem = useRef(null)

  useEffect(() => {
    console.log(loading)
    console.log(data)
    setlistItem([data?.url])
  }, [loading])


  const handleSort = () => {
    let _listItem = [...listItem]
    const draggedItemContent = _listItem?.splice(dragItem.current, 1)[0]
    _listItem?.splice(dragOverItem.current, 0, draggedItemContent)
    dragItem.current = null
    dragOverItem.current = null
    setlistItem(_listItem)
  }

  return (
    <div className="App">
      <button onClick={() => setlistItem([...listItem, Math.random()])} >Add Page</button>
    {
      listItem?.map((item, index) => (
        <div  
          draggable
          onDragStart={e => dragItem.current = index}
          onDragEnter={e => dragOverItem.current = index}
          onDragEnd={handleSort}
        >
          <div className='wrapper' >
            {typeof item == 'string' ? <img src={item} style={{height: '50px', width: '50px'}} /> : <div style={{height: '50px', width: '50px'}} />}
          </div>
        </div>
      ))
    }
    </div>
  );
}

export default App;

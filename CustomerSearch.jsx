import { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = 'AIzaSyBEug66Fcu2VSDXUQpEqJaKBMIlct0hV44' // 替換成你的 API 金鑰
const SPREADSHEET_ID = '174j7TToIC3icnXzz3ev9ljaHUrPeaU6rSrhLacISG78' // 替換成你的 Google Sheets ID
const RANGE = 'A:B' // 假設姓名在 A 欄，座位在 B 欄

function CustomerSearch() {
  const [customers, setCustomers] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
      )
      .then((response) => {
        if (response.data.values) {
          setCustomers(response.data.values.slice(1)) // 略過標題列
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [])

  const filteredCustomers = customers.filter(([name]) =>
    name.startsWith(search)
  )

  return (
    <div style={styles.container}>
      {/* 左側：搜尋表格 */}
      <div style={styles.searchContainer}>
        <h2>賓客座位查詢</h2>
        <input
          type='text'
          placeholder='輸入姓氏'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
        <table style={styles.table}>
          <thead>
            <tr>
              <th>姓名</th>
              <th>座位</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(([name, seat], index) => (
              <tr key={index}>
                <td>{name}</td>
                <td>{seat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 右側：座位圖 */}
      <div style={styles.imageContainer}>
        <h3>座位圖</h3>
        <img
          src='https://imgur.com/THvfdr9.jpeg'
          alt='座位圖'
          style={styles.image}
        />
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '20px'
  },
  searchContainer: {
    flex: 1,
    marginRight: '20px'
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  imageContainer: {
    flex: 1,
    textAlign: 'center'
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    border: '1px solid #ddd',
    borderRadius: '8px'
  }
}

export default CustomerSearch

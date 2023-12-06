import React, { useState, useEffect } from 'react';
import { catListRequest } from '../requests/main';
import { Link } from 'react-router-dom';
import './styles.css'

const DynamicTable = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await catListRequest();
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
        <div>
          <h1>Ваши коты. <Link to="/create">Создать</Link></h1>
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Owner ID</th>
                <th>Owner Nickname</th>
                <th>Breed ID</th>
                <th>Breed Title</th>
                <th>Nickname</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.id}</td>
                  <td>{item.owner.id}</td>
                  <td>{item.owner.username}</td>
                  <td>{item.breed.id}</td>
                  <td>{item.breed.title}</td>
                  <td>
                    <Link to={`/edit/${item.id}`} state={item}>{item.nickname}</Link>
                </td>
                  <td>{item.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

export default DynamicTable;
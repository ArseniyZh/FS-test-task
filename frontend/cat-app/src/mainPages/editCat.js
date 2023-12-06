import React, { useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { catUpdateRequest } from '../requests/main';
import { catDeleteRequest } from '../requests/main';

const EditPage = () => {
    const { state } = useLocation();
    const history = useNavigate();

    const [formData, setFormData] = useState({
        breed_title: state.breed.title,
        nickname: state.nickname,
        age: state.age,
    });

    useEffect(() => {
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await catUpdateRequest(state.id, formData.breed_title, formData.nickname, formData.age)
            if (response.status === 200) {
                history("/")
                window.location.reload()
            }
        } catch {
            console.log("update error")
        }
    };

    const onDelete = async (event) => {
        try {
            const response = await catDeleteRequest(state.id)
            if (response.status === 200) {
                history("/")
            } 
        } catch {
            console.log("delete error")
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    return (
        <div>
        <h2>Изменение кота</h2>
        <form onSubmit={onSubmit}>
            <div>
            <label>Breed Title:</label>
            <input
                type="text"
                name="breed_title"
                value={formData.breed_title}
                onChange={handleInputChange}
            />
            </div>
            <div>
            <label>Nickname:</label>
            <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
            />
            </div>
            <div>
            <label>Age:</label>
            <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
            />
            </div>
            <div>
            <button type="submit">Сохранить</button>
            <button onClick={onDelete}>Удалить</button>
            </div>
        </form>
        </div>
    );
};

export default EditPage;
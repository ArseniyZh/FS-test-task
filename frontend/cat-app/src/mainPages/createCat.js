import React, {useState, useEffect} from "react";
import { catCreateRequest } from "../requests/main";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
    const history = useNavigate();

    const [formData, setFormData] = useState({
        breed_title: "",
        nickname: "",
        age: 1,
    });

    useEffect(() => {
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await catCreateRequest(formData.breed_title, formData.nickname, formData.age)
            if (response.status === 201) {
                history("/")
                window.location.reload()
            }
        } catch {
            console.log("update error")
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    return (
    <div>
        <h2>Создание кота</h2>
        <form onSubmit={onSubmit}>
            <div>
            <label>Breed Title:</label>
            <input
                type="text"
                name="breed_title"
                value={formData.breed_title}
                onChange={handleInputChange}
                required
            />
            </div>
            <div>
            <label>Nickname:</label>
            <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                required
            />
            </div>
            <div>
            <label>Age:</label>
            <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
            />
            </div>
            <div>
            <button type="submit">Save</button>
            </div>
        </form>
    </div>
    );
};

export default CreatePage;

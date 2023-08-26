import React from "react";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import validate from "./validate";
import { postDog, getAllTemperament } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const DogCreate = () => {
    const dispatch = useDispatch();

    const allTemperaments = useSelector((state) => state.temperaments)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        height: 0,
        weight: 0,
        life_span: 0,
        image: "",
        temperament: []
    })

    const handleChange = (dog) => {
        setInput({
            ...input,
            [dog.target.value] : dog.target.value,
        })
        setErrors(validate({
            ...input,
            [dog.target.value] : dog.target.value
        }))
    }

    const handleSelect = (dog) => {
        if(!input.temperament.includes(dog.target.value)){
            setInput({
                ...input,
                temperament: [...input.temperament, dog.target.value]
            })
        }
    }

    const handleSubmit = (dog) => {
        dog.preventDefault()
        dispatch(postDog(input))

        alert("The dog was created")
        setInput({
            name: "",
            height: 0,
            weight: 0,
            life_span: 0,
            temperament: []
        })
        window.location.href = "/home";
    }

    const handleErase = (dog) => {
        setInput({
            ...input,
            temperament: input.temperament.filter(tem => tem !== dog)
        })
    }

    useEffect(() => {
        dispatch(getAllTemperament())
    }, [dispatch])

    return (
        <div>
            <h1>CREATE DOG</h1>
            <div>
                <Link to="/home">
                    <button>HOME</button>
                </Link>
            </div>
            <div>
                <form onSubmit={d => handleSubmit(d)}>
                    <div>
                        <h3>Name:</h3>
                        <input required type="text" value={input.name} onChange={d => handleChange(d)}/>
                    </div>
                    <div>
                        <h3>Height:</h3>
                        <input required 
                        name="height"
                        min="0" type="number" value={input.height} onChange={d => handleChange(d)}/>
                    </div>
                    <div>
                        <h3>Weight:</h3>
                        <input required 
                        name="weight"
                        min="0" type="number" value={input.weight} onChange={d => handleChange(d)}/>
                    </div>
                    <div>
                        <h3>Life Span:</h3>
                        <input required 
                        name="height"
                        min="0" type="number" value={input.life_span} onChange={d => handleChange(d)}/>
                    </div>
                    <div></div>
                    <div>
                        <h3>TEMPERAMENTS</h3>
                        <select onChange={handleSelect}>
                            <option value="all" disabled selected defaultValue>
                                Prototemperament
                            </option>
                            {
                            allTemperaments.map(t => {
                            return (
                                <option value={t.name} key={t.id}>{t.name}</option>
                                )
                            })
                        }
                        </select>
                    </div>
                    {
                        errors && 
                        (errors.name ||
                        errors.height ||
                        errors.weight ||
                        errors.life_span||
                        !input.name.length ||
                        input.height <=0 ||
                        input.weight <= 0||
                        input.life_span <= 0 ||
                        !input.temperament.length) 
                        ?
                        <div>The dog cant be Created Yed</div>
                        :
                        <button type="submit"> Create</button>
                    }
                </form>
                    <div>
                        {input.temperament.map((d, i) => {
                            return (
                                <div key={i++}>
                                    <div>
                                        {d}
                                    </div>
                                    <button onClick={() => handleErase(d)}>X</button>
                                </div>
                            )
                        })}
                    </div>

                    <div>
                        <h2>ERRORS:</h2>
                    </div>
                    <div>
                        <h2>{errors.name && (<p>{errors.name}</p>)}</h2>
                        <h2>{errors.height && (<p>{errors.height}</p>)}</h2>
                        <h2>{errors.weight && (<p>{errors.weight}</p>)}</h2>
                        <h2>{errors.life_span && (<p>{errors.life_span}</p>)}</h2>
                        <h2>{errors.temperament && (<p>{errors.temperament}</p>)}</h2>
                    </div>
            </div>
        </div>
    )
}

export default DogCreate;
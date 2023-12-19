const InputForm = (props) => {
    const data = props.data
    return (
        <div>
            <label htmlFor={data.name}>{data.text}</label>
            <input type={data.type} placeholder={data.text} className={data.name} name={data.name} onChange={data.getChange}/>
        </div>
    )
}

export default InputForm
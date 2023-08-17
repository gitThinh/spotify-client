
const InputBox = (props) => {
    console.log(props);
    return (
        <div className="groupInput">
            {props.data.map(input => {
                return (
                    <div className={input.name + 'Box'}>
                        <label htmlFor={input.name}>{input.text}</label>
                        <input type={input.type} placeholder={input.text} className={input.name} />
                    </div>
                )
            })}
        </div>
    );
};

export default InputBox;
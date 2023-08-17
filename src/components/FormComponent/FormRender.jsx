import '../../assets/LogAndSign/FormRender.css'
import InputBox from "./InputBox";



const FormRender = (props) => {
    const data = props.data;
    console.log(data.remember);
    return (
        <form className={data.nameform}>
            <InputBox data={data.inputLogin} />
            {data.rememberMe == true &&
                <div className='rememberMe'>
                    <div id="toggleRM"
                        onClick={(e) => {
                            e.currentTarget.classList.toggle('active');
                        }}>
                        <span className="ball"></span>
                    </div>
                    <p>Remember me</p>
                </div>
            }
            <button type="submit">{data.submit}</button>
        </form>
    );
};

export default FormRender;
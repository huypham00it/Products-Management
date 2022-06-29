const FormRow = ({label, type, name, value, onChange}) => (
    <div className="form-row">

        <label htmlFor={name} className="form-label">
            {label || name}
        </label>

        <input 
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="form-input"
        />
    </div>
)

export default FormRow;
const FormRowSelect = ({label, name, value, onChange, options}) => (
    <div className="form-row">

        <label htmlFor={name} className="form-label">
            {label || name}
        </label>

        <select
            className="form-select"
            value={value}
            onChange={onChange}
            name={name}
        >
            {options.map((op, index) => <option key={index} value={op}>{op}</option>)}
        </select>
    </div>
)

export default FormRowSelect;
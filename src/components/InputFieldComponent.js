const InputField = ({ label, name, value }) => (
    <div>
      <label>{label}:</label>
      <input type="text" name={name} value={value} />
    </div>
);
  
export default InputField;

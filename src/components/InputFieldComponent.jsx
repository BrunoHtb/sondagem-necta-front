import LabelText from './LabelTextComponent'

const InputField = ({ label, name, value, onChange }) => (
    <div>
      <LabelText label={label} />
      <input type="text" name={name} value={value} onChange={onChange} />
    </div>
);
  
export default InputField;

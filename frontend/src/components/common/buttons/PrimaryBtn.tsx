import { useTheme } from '../../../contexts/ThemeContext';

const PrimaryBtn: React.FC<{ title: string }> = ({ title }) => {
  const { theme } = useTheme();
  
  return (
    <button 
      type='button' 
      className='btn btn-primary'
      style={{ 
        backgroundColor: 'var(--primary-color)',
        borderColor: 'var(--primary-color)'
      }}
    >
      {title}
    </button>
  )
}

export default PrimaryBtn
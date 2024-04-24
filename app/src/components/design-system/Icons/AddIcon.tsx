
const AddIcon = (): HTMLElement  => {

  return (
    <svg className="h-8 w-8"  
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    strokeWidth="2" 
    stroke="currentColor" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round">  
        <path stroke="none" d="M0 0h24v24H0z"/>  
        <line x1="12" y1="5" x2="12" y2="19" />  
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
};

export default AddIcon;

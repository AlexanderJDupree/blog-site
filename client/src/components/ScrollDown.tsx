import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

const ScrollDown = ({ next }: { next: string }) => {
  return (
    <p className='text-center mt-5 mb-0 pt-3'>
      <a href={next} className='scrolldown'>
        <FA icon={faChevronCircleDown} className='icon' />
      </a>
    </p>
  );
};

export default ScrollDown;

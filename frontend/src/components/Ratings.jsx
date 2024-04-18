import {FaStar, FaStarHalfAlt, FaRegStar} from 'react-icons/fa'

const Rating = ({value, text}) => {
    return ( 

        <div className="rating text-2xl flex justify-start items-center	content-center">
            
                <span className='inline-block'>
                    {value >= 1 ? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
                </span>

                <span className='inline-block'>
                    {value >= 2 ? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}
                </span>

                <span className='inline-block'>
                    {value >= 3 ? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}
                </span>

                <span className='inline-block'> 
                    {value >= 4 ? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}
                </span>

                <span className='inline-block'>
                    {value >= 5 ? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}
                </span>
                
            <span className='rating-text ml-2'> {text && text}</span>

        </div>

     );
}
 
export default Rating;
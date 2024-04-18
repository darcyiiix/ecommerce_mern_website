import Collapse from "../Collapse";

const FAQ = () => {
    return ( 
    
        <div className="p-4">    
            <div className="text-center mx-auto mb-8">   
                <h2 className="text-3xl mb-2">help & faqs</h2>    
                <p>Need help? We've put together a handy FAQ section for you. If you can't find an answer to your question below, feel free to contact our fantastic customer service team</p>
            </div>  

            <Collapse question="How do I return a product?" answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non nulla nec dui tempor placerat ac a eros. Phasellus nisl justo, commodo vel vestibulum a, laoreet posuere leo. Sed faucibus augue vitae neque pharetra semper. Duis ut erat condimentum, lacinia tellus ac, dapibus ex. Nulla nibh tortor, tincidunt nec auctor vel, luctus non dui. Praesent a arcu turpis. In hac habitasse platea dictumst. Integer rhoncus consequat sem, vel volutpat tortor pellentesque nec. Phasellus ut euismod ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed dignissim blandit nibh, non faucibus ante maximus a. Donec sed enim a augue lacinia malesuada quis et urna." />
            <Collapse question="Payment methods?" answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non nulla nec dui tempor placerat ac a eros. Phasellus nisl justo, commodo vel vestibulum a, laoreet posuere leo. Sed faucibus augue vitae neque pharetra semper. Duis ut erat condimentum, lacinia tellus ac, dapibus ex. Nulla nibh tortor, tincidunt nec auctor vel, luctus non dui. Praesent a arcu turpis. In hac habitasse platea dictumst. Integer rhoncus consequat sem, vel volutpat tortor pellentesque nec. Phasellus ut euismod ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed dignissim blandit nibh, non faucibus ante maximus a. Donec sed enim a augue lacinia malesuada quis et urna." />
            <Collapse question="Are returns free?" answer="Praesent ornare hendrerit nisi vitae tincidunt. Pellentesque eu est magna. Quisque auctor, ligula a ornare hendrerit, urna mi tincidunt dui, vitae euismod ante dolor non magna. In eu ante in ipsum ornare maximus. Etiam ac aliquet dolor. Cras vitae urna eleifend, mattis diam id, porttitor dolor. Praesent ultrices enim id neque aliquet, id consectetur purus bibendum." />    
            <Collapse question="Can I exchange products?" answer="Sed gravida sagittis urna id facilisis. In hac habitasse platea dictumst. Nulla tempor vestibulum placerat. Integer fermentum quam nec sem convallis, sit amet pellentesque turpis rhoncus. Integer malesuada dui ut varius pharetra. Donec eget mollis sapien. In sed semper dui. In placerat neque vel lectus faucibus, at facilisis felis sagittis. Quisque quis gravida urna. Nunc tempor auctor egestas. Ut id erat ut elit pellentesque lobortis. Praesent auctor molestie pulvinar." />    
            <Collapse question="My order is faulty, what do I do?" answer="Sed gravida sagittis urna id facilisis. In hac habitasse platea dictumst. Nulla tempor vestibulum placerat. Integer fermentum quam nec sem convallis, sit amet pellentesque turpis rhoncus. Integer malesuada dui ut varius pharetra. Donec eget mollis sapien. In sed semper dui. In placerat neque vel lectus faucibus, at facilisis felis sagittis. Quisque quis gravida urna. Nunc tempor auctor egestas. Ut id erat ut elit pellentesque lobortis. Praesent auctor molestie pulvinar." />    
            <Collapse question="How long does the return take?" answer="Sed gravida sagittis urna id facilisis. In hac habitasse platea dictumst. Nulla tempor vestibulum placerat. Integer fermentum quam nec sem convallis, sit amet pellentesque turpis rhoncus. Integer malesuada dui ut varius pharetra. Donec eget mollis sapien. In sed semper dui. In placerat neque vel lectus faucibus, at facilisis felis sagittis. Quisque quis gravida urna. Nunc tempor auctor egestas. Ut id erat ut elit pellentesque lobortis. Praesent auctor molestie pulvinar." />    

        </div>

    );
}
 
export default FAQ;
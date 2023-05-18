import PopOverPost from "../(client-side)/components/PopOver";
import PostHandler from "../admin/[slug]/posts/PopOverPostHandler";

export default function flexPage() {
  return (
    <div className="flex flex-col min-h-screen">
        <header className="flex items-center justify-between h-20 bg-red-200">
            <div>Logo</div>
            <div>Login</div>
        </header>
        <section className="flex items-center justify-between h-20">
            <div>Cliente 1</div>
            <div>Cliente 2</div>
            <div>Cliente 3</div>
            <div>Cliente 4</div>
        </section>
        <main className="flex flex-grow bg-yellow-200">
            <div className="flex flex-col">
                <div className="">menú 1 asdf asdf asd</div>
                <div className="">menú 2</div>
                <div className="flex flex-col justify-end flex-grow bg-green-200">Config</div>
            </div>
            <div className="flex-grow md:flex bg-sky-200">

                <div className="p-3 border rounded-xl border-gray-300 bg-gray-200 min-w-[380px] max-w-[600px] m-5">

                    Feed
                </div>
                <div className="flex flex-grow ">            

                    <div className='flex justify-between p-4 m-4 bg-white border rounded-3xl w-96'>
                        <p>Instabox</p>
                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur fugiat laudantium, laborum, nam aliquid excepturi ipsum modi quam corporis ipsa nobis dolor, qui ad illo doloribus optio. Optio, minus aut.
                        </div>
                        
                    </div>                                        
                    
                </div>
                
            </div>            
        </main>
    </div>
  )
}

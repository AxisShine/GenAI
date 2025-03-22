import { useForm } from "react-hook-form";
import background from "../assets/background.jpg";

function Questions() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      checklist: [], // ensures it's always an array
    },
  });
  const onSubmit = (data) => {
    console.log(data); // data.checklist will be an array of selected options
  };
  return (
    <>
      <div className="bg-white w-screen h-screen">
        <div className="thinText text-purple-400 text-5xl absolute flex justify-center items-center w-full h-[50vh]">
          Let's Personalize Your Experience
        </div>
        <div className=" flex justify-center items-center w-screen h-screen">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="absolute mt-[20px] w-[50vw] h-[40vh] flex flex-col justify-center items-center gap-[20px] rounded-lg"
            style={{ boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)" }}
          >
            {/* first form question*/}
            <div className="text-purple-400 w-full thinText text-xl mt-[15px] ml-[15px]">
              How do you prefer to learn?
            </div>
            <label className="ml-[5px] text-purple-400 flex gap-[10px] justify-between w-[47vw]">
              <div className="questions-checklist">
                <input
                  type="checkbox"
                  value="option1"
                  {...register("checklist")}
                />
                Visuals
              </div>
              <div className="questions-checklist">
                <input
                  type="checkbox"
                  value="option1"
                  {...register("checklist")}
                />
                Auditory
              </div>
              <div className="questions-checklist">
                <input
                  type="checkbox"
                  value="option1"
                  {...register("checklist")}
                />
                Reading
              </div>
              <div className="questions-checklist">
                <input
                  type="checkbox"
                  value="option1"
                  {...register("checklist")}
                />
                Hands-on
              </div>
            </label>
            {/* second form question*/}
            <div className="text-purple-400 w-full thinText text-xl mt-[15px] ml-[15px]">
              What are you learning goals?
            </div>
            <label className="ml-[5px] text-purple-400 flex gap-[10px] justify-between w-[47vw]">
              <div className="questions-checklist">
                <input
                  type="checkbox"
                  value="option1"
                  {...register("checklist")}
                />
                Improve focus
              </div>
              <div className="questions-checklist">
                <input
                  type="checkbox"
                  value="option1"
                  {...register("checklist")}
                />
                Learn faster
              </div>
              <div className="questions-checklist">
                <input
                  type="checkbox"
                  value="option1"
                  {...register("checklist")}
                />
                Reduce stress
              </div>
              <div className="questions-checklist">
                <input
                  type="checkbox"
                  value="option1"
                  {...register("checklist")}
                />
                Improve knowledge
              </div>
            </label>
            <button type="submit ">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Questions;

import ClipLoader from "react-spinners/ClipLoader";
import classes from './ProjectModal.module.css';
import { useGlobalState } from "../../../context/GlobalstateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useForm, useFieldArray } from "react-hook-form";
import axios from 'axios';
import { toast } from "react-toastify";

const ProjectModal = ({onSuccess}) => {
  const { setShowModal, status, user,setStatus } = useGlobalState();

  const {
    register,
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      requiredSkills: [""],
      teamSize: 0,
      status: "",
      managerId: user.id 
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "requiredSkills",
  });

  const onSubmit = async(data) => {
    try{
        console.log("Form Data Submitted:", data);
        setStatus("pending")
    const response=await axios.post("https://work-sync-psi.vercel.app/api/projects",data);
    console.log(response);
    setStatus("success")
    setShowModal(false)
    toast.success("Project added successfully.")
    onSuccess();
    }
    catch(error){
        console.log(error);
        setStatus("error");
        toast.error("Error Occur")
    }
    ;
  };

  return (
    <div className={classes.overlay} onClick={() => setShowModal(false)}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <div className={classes["modal-header"]}>
          <h3>Create New Project</h3>
          <FontAwesomeIcon icon={faXmark} onClick={() => setShowModal(false)} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="inputName">Project Name</label> <br />
          <input
            type="text"
            placeholder="Project Name"
            {...register("name", { required: true })}
          />
          <br />

          <label htmlFor="inputDesc">Project Description:</label> <br />
          <textarea
            id="inputDesc"
            placeholder="Enter Project Description"
            rows={5}
            cols={30}
            {...register("description", { required: true })}
          />
          <br />

          <label htmlFor="startDate">Start Date:</label>
          <input type="date" {...register("startDate", { required: true })} />
          <br />

          <label htmlFor="endDate">End Date:</label>
          <input type="date" {...register("endDate", { required: true })} />
          <br />

          <label htmlFor="reqSkills">Required Skills</label><br />
          {fields.map((field, index) => (
            <div key={field.id}>
              <input
                {...register(`requiredSkills.${index}`, { required: true })}
              />
              {fields.length > 1 && (
                <FontAwesomeIcon
                  icon={faMinus}
                  onClick={() => remove(index)}
                  style={{ cursor: "pointer", marginLeft: "8px" }}
                />
              )}
            </div>
          ))}
          <FontAwesomeIcon
            icon={faPlus}
            onClick={() => append("")}
            style={{ cursor: "pointer", marginTop: "4px" }}
          />
          <br />

          <label htmlFor="teamSize">Team Size:</label>
          <input
            type="number"
            {...register("teamSize", { required: true, min: 1 , valueAsNumber:true})}
          />
          <br />

          <label htmlFor="inputStatus">Status:</label>
          <select {...register("status", { required: true })}>
            <option value="">Select Status</option>
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <br />

          <button type="submit" className={classes["save-btn"]}>
            {status === "pending" ? (
              <ClipLoader color="white" size={20} />
            ) : (
              "Save"
            )}
          </button>
          <button
            type="button"
            className={classes["close-btn"]}
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;

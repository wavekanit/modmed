import React from "react";
import FormWrapper from "../FormWrapper";

type EducationalData = {
  education: {
    degree: string;
    institute: string;
    year: string;
    sepecificField: string;
  }[];
};

type PersonalInfoRegisProps = EducationalData & {
  updateFields: (fields: Partial<EducationalData>) => void;
};

export function EducationalRegis(props: PersonalInfoRegisProps) {
  const [data, setData] = React.useState<EducationalData>(props);

  const handleInputChange = (
    index: number,
    field: keyof EducationalData["education"][number],
    value: string
  ) => {
    setData((prevData) => {
      const updatedEducation = [...prevData.education];
      updatedEducation[index][field] = value;
      return { education: updatedEducation };
    });
  };

  const handleRemoveClick = (index: number) => {
    const list = [...data.education];
    list.splice(index, 1);
    setData({ ...data, education: list });
  };

  const handleAddClick = () => {
    setData((prevData) => ({
      education: [
        ...prevData.education,
        { degree: "", institute: "", year: "", sepecificField: "" },
      ],
    }));
  };

  return (
    <FormWrapper title="3/3 Educational Background">
      {data.education.map((x, i) => {
        return (
          <div className="my-2" key={i}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
              Degree
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="degree"
              id=""
              value={x.degree}
              onChange={(e) => handleInputChange(i, "degree", e.target.value)}
            >
              <option value="">Select</option>
              <option value="bachelor">Bachelor</option>
              <option value="master">Master</option>
              <option value="phd">PhD</option>
            </select>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Institute
            </label>
            <input
              type="text"
              name="institute"
              value={x.institute}
              onChange={(e) =>
                handleInputChange(i, "institute", e.target.value)
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Institute"
            />
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Year
            </label>
            <input
              type="text"
              name="year"
              value={x.year}
              onChange={(e) => handleInputChange(i, "year", e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Year"
            />
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Specific Field
            </label>
            <input
              type="text"
              name="sepecificField"
              value={x.sepecificField}
              onChange={(e) =>
                handleInputChange(i, "sepecificField", e.target.value)
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Specific Field"
            />
            <div className="my-2">
              {data.education.length !== 1 && (
                <button
                  className="w-1/2 text-white bg-red-600 hover:bg-red-700 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 my-2 mx-2"
                  onClick={() => handleRemoveClick(i)}
                >
                  Remove
                </button>
              )}
              {data.education.length - 1 === i && (
                <button
                  className="w-1/2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2 mx-2"
                  onClick={handleAddClick}
                >
                  Add
                </button>
              )}
            </div>
          </div>
        );
      })}
    </FormWrapper>
  );
}

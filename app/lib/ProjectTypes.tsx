import {getTranslations} from "next-intl/server";

export const getProjectTypes = async () => {
  const projectMessages = await getTranslations("Projects");

  return {
    landscapeDesign: {
      type: projectMessages("projectTypes.landscapeDesign.type"),
    },
    interiorDesign: {
      type: projectMessages("projectTypes.interiorDesign.type"),
    },
    architecturalDesign: {
      type: projectMessages("projectTypes.architecturalDesign.type"),
      subTypes: [
        projectMessages("projectTypes.architecturalDesign.subTypes.housing"),
        projectMessages("projectTypes.architecturalDesign.subTypes.commercial"),
        projectMessages(
          "projectTypes.architecturalDesign.subTypes.competition"
        ),
      ],
    },
  };
};

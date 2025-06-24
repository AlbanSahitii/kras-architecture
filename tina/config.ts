import {defineConfig} from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "kras-admin-1zksao2",
    publicFolder: "public",
  },
  media: {
    loadCustomStore: async () => {
      const {GitHubMediaStore} = await import("next-tinacms-github");
      return new GitHubMediaStore({
        mediaRoot: "public",
        publicFolder: "public",
      });
    },
  }, // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "Projects",
        label: "Projects",
        path: "content/projects",
        defaultItem: {
          mainPage: false,
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "germanTitle",
            label: "German Title",
            required: true,
          },
          {
            type: "string",
            label: "Type",
            name: "type",
            required: true,
            options: [
              {label: "Landscape Design", value: "landscapeDesign"},
              {label: "Architectural Design", value: "architecturalDesign"},
              {label: "Interior Design", value: "interiorDesign"},
            ],
          },
          {
            type: "string",
            name: "subType",
            label: "Sub Type",
            options: [
              {value: "housing", label: "Housing"},
              {value: "commercial", label: "Commercial"},
              {value: "competition", label: "Competition"},
            ],
          },
          {
            type: "string",
            label: "Phase",
            name: "phase",
            options: [
              {label: "On-going", value: "On-going"},
              {label: "Completed", value: "Completed"},
              {label: "Conceptual", value: "Conceptual"},
            ],
          },

          {
            type: "string",
            name: "city",
            label: "City",
          },
          {
            type: "string",
            name: "address",
            label: "Address",
          },
          {
            name: "mainPage",
            label: "Show on main page",
            type: "boolean",
          },
          {
            type: "string",
            name: "date",
            label: "date",
          },
          {
            type: "rich-text",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "rich-text",
            name: "germanDescription",
            label: "German Description",
            required: true,
          },
          {
            type: "string",
            name: "germanTitleDescription",
            label: "German Title Description",
            required: true,
          },
          {
            type: "string",
            name: "titleDescription",
            label: "Title Description",
            required: true,
          },

          {
            type: "string",
            name: "thumbnail",
            label: "Thumbnail image",
            required: true,
            ui: {
              component: "image",
            },
          },
          {
            type: "string",
            name: "thumbnailMobile",
            label: "Mobile Thumbnail Image",
            required: true,
            ui: {
              component: "image",
            },
          },

          {
            type: "object",
            name: "images",
            label: "Images",
            list: true,
            fields: [
              {
                type: "string",
                name: "image",
                label: "image",
                required: true,
                ui: {
                  component: "image",
                },
              },
              {
                type: "string",
                name: "photoDescriptionTitle",
                label: "Photo Description Title",
              },
              {
                type: "string",
                name: "photoDescriptionTitleGerman",
                label: "Photo Description Title German",
              },
              {
                type: "rich-text",
                name: "description",
                label: "Description",
              },
              {
                type: "rich-text",
                name: "germanDescription",
                label: "German Description",
              },
              {
                type: "string",
                name: "type",
                label: "Type",
              },
              {
                type: "string",
                name: "germanType",
                label: "German Type",
              },
            ],
          },
        ],
      },
      {
        name: "Blogs",
        label: "Blogs",
        path: "content/blogs",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
            isTitle: true,
          },
          {
            type: "string",
            name: "germanTitle",
            label: "German Title",
            required: true,
          },
          {
            type: "string",
            name: "type",
            label: "Type",
            required: true,
          },
          {
            type: "string",
            name: "germanType",
            label: "German Type",
            required: true,
          },
          {
            type: "rich-text",
            name: "description",
            label: "description",
            required: true,
          },
          {
            type: "rich-text",
            name: "germanDescription",
            label: "German Description",
            required: true,
          },
          {
            name: "date",
            label: "Date",
            type: "datetime",
            ui: {
              dateFormat: "YYYY-MM-DD",
              timeFormat: "HH:mm",
            },
          },

          {
            type: "string",
            name: "thumbnail",
            label: "Thumbnail image",
            required: true,
            ui: {
              component: "image",
            },
          },
        ],
      },
      {
        name: "Employees",
        label: "Employees",
        path: "content/employees",
        fields: [
          {
            type: "string",
            name: "full_Name",
            label: "Full_Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            label: "Role",
            name: "role",
            required: true,
            options: [
              {label: "CEO", value: "Ceo"},
              {label: "Partner", value: "Partner"},
              {label: "Team Leader", value: "Team Leader"},
              {label: "Supervisor", value: "Supervisor"},
              {label: "Architect", value: "Architect"},
              {label: "Finance", value: "Finance"},
            ],
          },
          {
            type: "string",
            label: "German Role",
            name: "germanRole",
            required: true,
            options: [
              {label: "CEO", value: "Ceo"},
              {label: "Partner", value: "Partner"},
              {label: "Teamleiter", value: "Teamleiter"},
              {label: "Aufsichtsperson", value: "Aufsichtsperson"},
              {label: "Architekt", value: "Architekt"},
              {label: "Finanzen", value: "Finanzen"},
            ],
          },
          {
            type: "rich-text",
            name: "description",
            label: "Description ",
            required: true,
          },
          {
            type: "rich-text",
            name: "germanDescription",
            label: "German Description",
            required: true,
          },

          {
            type: "string",
            name: "thumbnail",
            label: "Thumbnail image",
            required: true,
            ui: {
              component: "image",
            },
          },
        ],
      },
    ],
  },
});

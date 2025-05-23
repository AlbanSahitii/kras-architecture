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
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "Projects",
        label: "Projects",
        path: "content/projects",
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
              {label: "Residental", value: "Residental"},
              {label: "Comercial", value: "Comercial"},
              {label: "Competition", value: "Competition"},
            ],
          },
          {
            type: "string",
            label: "German Type",
            name: "germanType",
            required: true,
            options: [
              {label: "Wohnsitz", value: "Wohnsitz"},
              {label: "Kommerziell", value: "Kommerziell"},
              {label: "Wettbewerb", value: "Wettbewerb"},
            ],
          },

          {
            type: "string",
            name: "city",
            label: "City",
            required: true,
          },
          {
            type: "string",
            name: "address",
            label: "Address",
            required: true,
          },
          {
            type: "string",
            name: "date",
            label: "date",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "string",
            name: "germanDescription",
            label: "German Description",
            required: true,
          },

          {
            type: "string",
            name: "surface",
            label: "Surface",
            required: true,
          },
          {
            type: "string",
            name: "floors",
            label: "Floors",
            required: true,
          },
          {
            type: "string",
            name: "investor",
            label: "Investor",
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
            type: "object",
            name: "images",
            label:
              "Images - Finish all information above before uploading list of images",
            required: true,
            list: true,
            fields: [
              {
                type: "string",
                name: "src",
                ui: {
                  component: "image",
                },
              },
            ],
          },
        ],
      },
      {
        name: "News",
        label: "News",
        path: "content/news",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
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
            name: "description",
            label: "Description ",
            required: true,
          },
          {
            type: "string",
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
          {
            type: "string",
            name: "date",
            label: "date",
            required: true,
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
            type: "string",
            name: "description",
            label: "Description ",
            required: true,
          },
          {
            type: "string",
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

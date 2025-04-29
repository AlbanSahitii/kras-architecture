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
            name: "type",
            label: "Type",
            required: true,
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
            label: "Images",
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
            name: "role",
            label: "Role",
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

export function validation(action, value) {
   switch (action) {
      case "title":
         let regex = /^.{1,60}$/;
         if (value === "") {
            return "Title is required"
         }
         else if (!regex.test(value)) {
            return "Title must be less than 60 charecters";
         }
         return "";

      case "overview":
         const overview = /^.{1,450}$/;
         if (value === "") {
            return "Overview is required"
         }
         else if (!overview.test(value)) {
            return "Overview should be less than 450 characters";
         }
         return "";
      case "publishedYear":
         if (value < 1000 || value > 9999) {
            return "Invalid year"
         }
         return ""
      case "description":
         const description = /^.{0,1500}$/;

         if (!description.test(value)) {
            return "Description should be less than 450 characters";
         }
         return "";

      case "email":
         const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
         if (!emailRegex.test(value)) {
            return "Invalid email address"
         }
         return ""
      case "password":
         const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;
         if (!passwordRegex.test(value)) {
            return "At least 6 charecters and 1 special Charecter"
         }
         return ""
      default:
         return ""
   }
}
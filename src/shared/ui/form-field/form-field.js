export const initFormField = () => {};

// export const initFormField = () => {
//   const wrappers = document.querySelectorAll("[data-input-wrapper]");

//   wrappers.forEach((wrapper) => {
//     const input = wrapper.querySelector("[data-input]");
//     const dropdown = wrapper.querySelector("[data-dropdown]");
//     if (!dropdown) return;

//     const getVisibleItems = () => {
//       // items - NodeList всех опций
//       const allItems = dropdown.querySelectorAll("[data-option]");
//       return Array.from(allItems).filter(
//         (item) => item.style.display !== "none"
//       );
//     };

//     const setActiveItem = (item) => {
//       getVisibleItems().forEach((i) => i.classList.remove("active"));
//       if (item) {
//         item.classList.add("active");
//         item.scrollIntoView({ block: "nearest" });
//       }
//     };

//     const selectActiveItem = () => {
//       const activeItem = dropdown.querySelector(
//         ".form-field__dropdown-item.active"
//       );
//       if (activeItem) {
//         activeItem.click();
//       }
//     };

//     const show = () => {
//       dropdown.style.display = "block";
//       setActiveItem(null);
//     };
//     const hide = () => {
//       dropdown.style.display = "none";
//       setActiveItem(null);
//     };

//     input.addEventListener("input", () => {
//       const value = input.value.toLowerCase();

//       // так как `hasVisible` будет `false`
//       let hasVisible = false;
//       const allItems = dropdown.querySelectorAll("[data-option]");

//       allItems.forEach((item) => {
//         const text = item.dataset.option.toLowerCase();
//         const match = text.includes(value);
//         item.style.display = match ? "block" : "none";
//         if (match) {
//           hasVisible = true;
//         }
//       });

//       hasVisible ? show() : hide();
//       setActiveItem(null);
//     });

//     dropdown.querySelectorAll("[data-option]").forEach((item) => {
//       item.addEventListener("click", () => {
//         input.value = item.dataset.option;
//         hide();
//       });
//     });

//     input.addEventListener("keydown", (e) => {
//       const visibleItems = getVisibleItems();
//       if (visibleItems.length === 0 || dropdown.style.display === "none") {
//         return;
//       }

//       const currentIndex = visibleItems.findIndex((item) =>
//         item.classList.contains("active")
//       );

//       if (e.key === "ArrowDown") {
//         e.preventDefault();
//         const nextIndex = (currentIndex + 1) % visibleItems.length;
//         setActiveItem(visibleItems[nextIndex]);
//       } else if (e.key === "ArrowUp") {
//         e.preventDefault();
//         const prevIndex =
//           (currentIndex - 1 + visibleItems.length) % visibleItems.length;
//         setActiveItem(visibleItems[prevIndex]);
//       } else if (e.key === "Enter") {
//         if (currentIndex !== -1) {
//           e.preventDefault();
//           selectActiveItem();
//         }
//       }
//     });

//     document.addEventListener("click", (e) => {
//       if (!wrapper.contains(e.target)) hide();
//     });
//   });
// };

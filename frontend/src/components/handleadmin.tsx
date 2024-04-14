// import React from "react";

// type Props = {
//   children: React.ReactNode;
// };
// // middleware
// const Handleadmin = (props: Props) => {
//   const navigate = useNavigate();
//   React.useEffect(() => {
//     localStorage.getItem("jwt");
//     axios.get().then((result) => {
//       if (!result.role.admin) {
//         navigate("/");
//       }
//     });
//   }, []);

//   return <div>{props.children}</div>;
// };

// const HandleUser = (props: Props) => {
//   const navigate = useNavigate();
//   React.useEffect(() => {
//     localStorage.getItem("jwt");
//     axios.get().then((result) => {
//       if (!result.role.user) {
//         navigate("/");
//       }
//     });
//   }, []);

//   return <div>{props.children}</div>;
// };

// export default Handleadmin;

// axios.post('url', {
//   userId: 'asd',
//   abc: '123'
// })
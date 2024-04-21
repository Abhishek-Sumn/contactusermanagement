"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Adminerror from "../../components/Adminerror";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Router from "next/router";
const Admin = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  //console.log(session)

  const [tenant, setTenant] = useState([]);
  const [users, setUsers] = useState([]);
  const [newTenantname, setNewTenantname] = useState();
  const [newTenantdesc, setNewTenantdesc] = useState();

  /*  console.log(newTenantname)
  console.log(newTenantdesc) */
  const getTenant = async () => {
    const res = await axios.get("/api/tenant/gettenant/");
    //console.log(resData)
    setTenant(res.data.result);
  };

  const getUsers = async () => {
    const res = await axios.get("/api/getusers/");
    //console.log(resData)
    setUsers(res.data.result);
  };

  useEffect(() => {
    getTenant();
    getUsers();
  }, []);

  const handleNewTenant = async () => {
    try {
      const res = await axios.post("/api/tenant/gettenant/", {
        name: newTenantname,
        description: newTenantdesc,
      });
      setNewTenantname("");
      setTenant([...tenant, res.data.savedTenant]);
      setNewTenantdesc("");
      if (res.status === 200) {
        return toast.success("Tenant added");
      }
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete("/api/tenant/gettenant/", {
        data: {
          getid: id,
        },
      });
      const na = res.data.deletedTenant.name;
      const newar = tenant.filter((ele, index) => ele.name != na);
      setTenant(newar);
      if (res.status === 404) {
        return toast.error("Tenant does not exist");
      }
    } catch (error) {}
  };

  const handleUserDelete = async (id) => {
    try {
      const res = await axios.delete("/api/getusers", {
        data: {
          getid: id,
        },
      });
      const na = res.data.deletedUser.email;
      const newar = users.filter((ele, index) => ele.email != na);
      setUsers(newar);
      if (res.status === 404) {
        return toast.error("User does not exist");
      }
    } catch (error) {}
  };

  return (
    <div className=" flex items-center justify-center mt-[14vh] ">
      {session?.user?.role === "admin" ? (
        <div className="flex gap-4 flex-col">
          <div class="relative overflow-x-auto">
            <span className="text-lg">Tenants</span>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Tenant name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {tenant?.map((element,index) => (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index+1000}>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {element.name}
                    </th>
                    <td class="px-6 py-4">{element.description}</td>
                    <td class="px-6 py-4">
                      {" "}
                      <button
                        onClick={() => handleDelete(element.name)}
                        className="px-4 py-2 backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <input
                      type="text"
                      id="first_name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Org name"
                      value={newTenantname}
                      onChange={(e) => setNewTenantname(e.target.value)}
                      required
                    />
                  </th>
                  <td class="px-6 py-4">
                    <input
                      type="text"
                      id="first_name"
                      value={newTenantdesc}
                      onChange={(e) => setNewTenantdesc(e.target.value)}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Descriptiopn"
                      required
                    />
                  </td>
                  <td class="px-6 py-4">
                    <button
                      onClick={handleNewTenant}
                      className="px-4 py-2 backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200"
                    >
                      Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="relative overflow-x-auto">
            <span className="text-lg">Users</span>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    User name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Verified
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Tenant
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map((element,index) => (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  key={index}>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {element.firstname}
                    </th>
                    <td class="px-6 py-4">{element.email}</td>
                    <td class="px-6 py-4">
                      {element.isVerified ? <h1>True</h1> : <h1>False</h1>}
                    </td>
                    <td class="px-6 py-4">
                      {element.organisation.map((e) => (
                        <h1  key={index+100}>{e}</h1>
                      ))}
                    </td>
                    <td class="px-6 py-4">
                      {" "}
                      <button
                        onClick={() => handleUserDelete(element.email)}
                        className="px-4 py-2 backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Adminerror />
      )}
    </div>
  );
};

export default Admin;

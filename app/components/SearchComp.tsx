"use client";

import React, { useState, useEffect } from "react";
import { Input, Modal, Form, Input as AntInput, Button, message } from "antd";
import { useParams, useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";

const { Search } = Input;

interface UserData {
  name: string;
  email: string;
  phone: string;
}

const SearchComp = () => {
  const params = useParams();
  const slug = params.slug;
  const [form] = Form.useForm();

  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneValue, setPhoneValue] = useState<string>();
  const router = useRouter();

  // Check if user data exists in localStorage
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      // User has already submitted their data
      const parsedData = JSON.parse(userData);
      form.setFieldsValue(parsedData);
      setPhoneValue(parsedData.phone);
    }
  }, [form]);

  const onSearch = (value: string) => {
    if (value.trim() !== "") {
      // Check search count
      const searchCount = parseInt(localStorage.getItem("freeTrials") || "0");
      const userData = localStorage.getItem("userData");

      if (searchCount >= 3 && !userData) {
        // Show modal if user has used all free searches and hasn't submitted data
        setShowModal(true);
        return;
      }

      // Increment search count
      const newCount = searchCount + 1;
      localStorage.setItem("freeTrials", newCount.toString());

      // Perform search
      if (slug) {
        router.push(`/${slug}/search?query=${encodeURIComponent(value)}`);
      } else {
        router.push(`/${slug}/search?query=${encodeURIComponent(value)}`);
      }
    }
  };

  const handleSubmit = async (values: UserData) => {
    setLoading(true);
    try {
      // Prepare data for API
      const userData = {
        name: values.name,
        email: values.email,
        phone: phoneValue?.replace(/\D/g, ""), // Remove all non-digit characters
      };

      // Post data to API endpoint
      await axios.post(
        "https://api.mis.mtninstitute.net/v1/visitors",
        userData
      );

      // Save user data to localStorage
      localStorage.setItem("userData", JSON.stringify(userData));

      // Reset search count
      localStorage.setItem("freeTrials", "0");

      message.success("شكرا لتسجيل بياناتك! يمكنك الآن متابعة البحث.");
      setShowModal(false);

      // Perform the search that was attempted
      if (searchValue.trim() !== "") {
        if (slug) {
          router.push(
            `/${slug}/search?query=${encodeURIComponent(searchValue)}`
          );
        } else {
          router.push(`/search?query=${encodeURIComponent(searchValue)}`);
        }
      }
    } catch (error) {
      console.error("Error saving user data:", error);

      // Check if the error is because email already exists
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 409 &&
        error.response?.data?.message === "email already exist"
      ) {
        // If email already exists, consider the user as registered
        const userData = {
          name: values.name,
          email: values.email,
          phone: phoneValue?.replace(/\D/g, ""),
        };

        // Save user data to localStorage
        localStorage.setItem("userData", JSON.stringify(userData));

        // Reset search count
        localStorage.setItem("freeTrials", "0");

        message.success("تم التعرف عليك! يمكنك الآن متابعة البحث.");
        setShowModal(false);

        // Perform the search that was attempted
        if (searchValue.trim() !== "") {
          if (slug) {
            router.push(
              `/${slug}/search?query=${encodeURIComponent(searchValue)}`
            );
          } else {
            router.push(`/search?query=${encodeURIComponent(searchValue)}`);
          }
        }
      } else {
        // Handle other errors
        message.error("فشل في حفظ بياناتك. يرجى المحاولة مرة أخرى.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-full w-full flex">
        <Search
          placeholder="ابحث هنا"
          allowClear
          onSearch={onSearch}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="flex-grow h-full"
          style={{ height: "100%" }}
          dir="rtl"
        />
      </div>

      <Modal
        title="لإستكمال البحث يرجي ملئ البيانات التالية"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        centered
      >
        <Form dir="rtl" form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="الاسم"
            rules={[{ required: true, message: "برجاء ادخال الاسم" }]}
          >
            <AntInput placeholder="ادخل الاسم" />
          </Form.Item>

          <Form.Item
            name="email"
            label="البريد الالكتروني"
            rules={[
              { required: true, message: "برجاء ادخال بريد الكتروني" },
              { type: "email", message: "برجاء ادخال بريد الكتروني صحيح" },
            ]}
          >
            <AntInput placeholder="برجاء ادخال بريد الكتروني" type="email" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="رقم الهاتف"
            rules={[{ required: true, message: "برجاء ادخال رقم الهاتف" }]}
          >
            <div className="grid w-full mb-6 items-center gap-1.5">
              <div
                dir="ltr"
                className="flex items-center justify-center w-full"
              >
                <PhoneInput
                  country={"eg"}
                  value={phoneValue}
                  onChange={setPhoneValue}
                  inputClass="bg-[#f2f2f2] border-2 border-red-500 focus:bg-white transition-colors w-full"
                  containerClass="phone-input"
                  buttonClass="bg-[#f2f2f2]"
                  inputProps={{
                    id: "phone-input",
                    required: true,
                  }}
                />
              </div>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              ارسال و استكمال البحث
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SearchComp;
